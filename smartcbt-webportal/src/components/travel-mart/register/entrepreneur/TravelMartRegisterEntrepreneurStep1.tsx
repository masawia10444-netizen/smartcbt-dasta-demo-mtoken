import Flex from "@/components/Flex";
import Form from "@/components/form/Form";
import FormCheckbox from "@/components/form/FormCheckbox";
import { FormFieldError } from "@/components/form/FormFieldError";
import FormFloatingLabelTextInput from "@/components/form/FormFloatingLabelTextInput";
import { FormLabel } from "@/components/form/FormLabel";
import { AppContext } from "@/contexts/App.context";
import { TravelMartRegisterEntrepreneurSchema } from "@/schemas/forms/travel-mart/register/travel-mart-register-entrepreneur-schema";
import { useTranslations } from "next-intl";
import { useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";

type TravelMartRegisterEntrepreneurStep1Props = {
  setIsLoading: (isLoading: boolean) => void;
  mode: "create" | "view";
};

const TravelMartRegisterEntrepreneurStep1 = ({ setIsLoading, mode }: TravelMartRegisterEntrepreneurStep1Props) => {
  const t = useTranslations("common");

  const {
    control,
    watch,
    resetField,
    setValue,
    register,
    formState: { errors, dirtyFields },
  } = useFormContext<TravelMartRegisterEntrepreneurSchema>();

  const { districts, provinces, subdistricts } = useContext(AppContext);

  const province = watch("address.province");
  const district = watch("address.district");
  const subdistrict = watch("address.subdistrict");

  const showOtherInput = watch("haveOther");

  useEffect(() => {
    if (!(dirtyFields?.address?.province || dirtyFields.address?.district)) return;
    resetField("address.district", { keepDirty: true });
  }, [province]);

  useEffect(() => {
    if (!(dirtyFields.address?.province || dirtyFields.address?.district)) return;
    resetField("address.subdistrict", { keepDirty: true });
  }, [district]);

  useEffect(() => {
    subdistrict?.postal && setValue("address.postCode", subdistrict.postal);
  }, [subdistrict]);

  const searchDistricts = async (query?: string) => {
    return Promise.resolve(
      districts?.filter((di) => di.province == province?.id && di.title?.includes(query ?? "")) ?? []
    );
  };

  const searchSubDistricts = async (query?: string) => {
    return Promise.resolve(
      subdistricts?.filter((sub) => sub.district == district?.id && sub.title?.includes(query ?? "")) ?? []
    );
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col">
        <h3 className="font-semibold text-smart-cbt-dark-green">
          {t("travelMart.register.entrepreneur.businessInformation")}
        </h3>
        <Flex.Container>
          <Flex.Element>
            <FormFloatingLabelTextInput
              name="companyName"
              control={control}
              type="text"
              isRequired
              placeholder={t("travelMart.register.entrepreneur.companyName")}
              disabled={mode == "view"}
              showClearButton={mode == "create"}
              errorMessage={errors?.companyName?.message}
            />
          </Flex.Element>
        </Flex.Container>
        <Flex.Container>
          <Flex.Element>
            <FormFloatingLabelTextInput
              name="companyLicenseNumber"
              control={control}
              type="text"
              isRequired
              placeholder={t("travelMart.register.entrepreneur.companyLicenseNumber")}
              disabled={mode == "view"}
              showClearButton={mode == "create"}
              errorMessage={errors?.companyLicenseNumber?.message}
            />
          </Flex.Element>
        </Flex.Container>
        {/* <Flex.Container>
          <Flex.Element>
            <label className="text-sm font-light text-smart-cbt-dark-grey">
              {t("travelMart.register.entrepreneur.companyRegistrationDocument")}
            </label>
            <Form.ImageInput
              control={control}
              labelClassName="rounded-full mt-2 border-smart-cbt-green text-smart-cbt-green"
              icon={<SolarPaperclipBold />}
              hideTitle
              labelText={t("travelMart.register.entrepreneur.attachDocuments")}
              className="flex-row flex-wrap"
              name="files"
              onLoading={(loading) => setIsLoading(loading)}
            />
            {errors.files?.message && <FormFieldError error={errors.files.message} />}
          </Flex.Element>
        </Flex.Container> */}
      </div>
      <div className="flex flex-col">
        <Flex.Container>
          <Flex.Element className="px-2">
            {/* <Form.TextArea
              placeholder={t("travelMart.register.entrepreneur.companyLocationDetail")}
              type="text"
              isRequired
              showClearButton={mode == "create"}
              disabled={mode == "view"}
              name="address.addressDetail"
              control={control}
              errorMessage={errors?.address?.addressDetail?.message}
            /> */}
            <FormLabel>
              <span className="text-smart-cbt-red">*</span>
              {t("travelMart.register.entrepreneur.companyLocationDetail")}
            </FormLabel>
            <Form.TextArea
              {...register("address.addressDetail")}
              disabled={mode == "view"}
              rows={3}
              placeholder={t("travelMart.register.entrepreneur.companyLocationDetail")}
              intent={mode == "view" ? "disabled" : null}
              required={true}
            />
            {errors?.address?.addressDetail?.message && (
              <FormFieldError error={errors.address?.addressDetail.message} />
            )}
          </Flex.Element>
        </Flex.Container>
        <Flex.Container>
          <Flex.Element>
            <Form.FloatingDropSearch
              name="address.province"
              values={provinces}
              idKey="id"
              disabled={mode == "view"}
              displayKey="title"
              title={t("travelMart.register.address.province")}
              filterKey={"title"}
              placeholder={t("travelMart.register.address.province")}
              control={control}
              isRequired
            />
            {errors.address?.province?.message && <FormFieldError error={errors.address?.province?.message} />}
          </Flex.Element>
          <Flex.Element>
            <Form.FloatingDropSearch
              name="address.district"
              searchFunction={searchDistricts}
              idKey="id"
              displayKey="title"
              title={t("travelMart.register.address.district")}
              placeholder={t("travelMart.register.address.district")}
              disabled={!province?.id || mode == "view"}
              control={control}
              isRequired
            />
            {errors.address?.district?.message && <FormFieldError error={errors.address?.district?.message} />}
          </Flex.Element>
        </Flex.Container>
        <Flex.Container>
          <Flex.Element>
            <Form.FloatingDropSearch
              name="address.subdistrict"
              searchFunction={searchSubDistricts}
              idKey="id"
              displayKey="title"
              title={t("travelMart.register.address.subdistrict")}
              placeholder={t("travelMart.register.address.subdistrict")}
              control={control}
              disabled={!district?.id || mode == "view"}
              isRequired
            />
            {errors.address?.subdistrict?.message && <FormFieldError error={errors.address?.subdistrict?.message} />}
          </Flex.Element>
          <Flex.Element>
            <FormFloatingLabelTextInput
              placeholder={t("travelMart.register.address.postCode")}
              type="text"
              showClearButton={mode == "create"}
              name="address.postCode"
              control={control}
              disabled={true}
              isRequired
              errorMessage={errors?.address?.postCode?.message}
            />
          </Flex.Element>
        </Flex.Container>
        <Flex.Container>
          <Flex.Element>
            <FormFloatingLabelTextInput
              placeholder={t("travelMart.register.address.lat")}
              type="text"
              disabled={mode == "view"}
              name="address.lat"
              control={control}
              errorMessage={errors?.address?.lat?.message}
            />
          </Flex.Element>
          <Flex.Element>
            <FormFloatingLabelTextInput
              placeholder={t("travelMart.register.address.long")}
              type="text"
              disabled={mode == "view"}
              showClearButton={mode == "create"}
              name="address.long"
              control={control}
              errorMessage={errors?.address?.long?.message}
            />
          </Flex.Element>
        </Flex.Container>
        <Flex.Container>
          <Flex.Element>
            <FormFloatingLabelTextInput
              placeholder={t("travelMart.register.address.googleMapUrl")}
              type="text"
              showClearButton={mode == "create"}
              name="address.googleMapUrl"
              disabled={mode == "view"}
              control={control}
              errorMessage={errors?.address?.googleMapUrl?.message}
            />
          </Flex.Element>
        </Flex.Container>
      </div>
      <div className="flex flex-col">
        <h3 className="font-semibold text-smart-cbt-dark-green">
          {t("travelMart.register.entrepreneur.lengthOfBusiness")}
        </h3>
        <Flex.Container>
          <Flex.Element>
            <FormFloatingLabelTextInput
              placeholder={t("travelMart.register.entrepreneur.lengthOfBusiness")}
              type="number"
              showClearButton={mode == "create"}
              disabled={mode == "view"}
              name="lengthOfBusiness"
              control={control}
              min={0}
              isRequired
              errorMessage={errors?.lengthOfBusiness?.message}
            />
          </Flex.Element>
          <Flex.Element />
        </Flex.Container>
      </div>
      <div className="flex flex-col">
        <h3 className="font-semibold text-smart-cbt-dark-green">
          {t("travelMart.register.entrepreneur.coordinatorInformation")}
        </h3>
        <Flex.Container>
          <Flex.Element>
            <FormFloatingLabelTextInput
              placeholder={t("travelMart.register.entrepreneur.coordinatorFirstName")}
              type="text"
              showClearButton={mode == "create"}
              disabled={mode == "view"}
              isRequired
              name="firstName"
              control={control}
              errorMessage={errors?.firstName?.message}
            />
          </Flex.Element>
          <Flex.Element>
            <FormFloatingLabelTextInput
              placeholder={t("travelMart.register.entrepreneur.coordinatorLastName")}
              type="text"
              showClearButton={mode == "create"}
              disabled={mode == "view"}
              isRequired
              name="lastName"
              control={control}
              errorMessage={errors?.lastName?.message}
            />
          </Flex.Element>
        </Flex.Container>
        <Flex.Container>
          <Flex.Element>
            <FormFloatingLabelTextInput
              placeholder={t("travelMart.register.entrepreneur.coordinatorPhoneNumber")}
              type="text"
              showClearButton={mode == "create"}
              disabled={mode == "view"}
              isRequired
              name="phoneNumber"
              control={control}
              errorMessage={errors?.phoneNumber?.message}
            />
          </Flex.Element>
          <Flex.Element>
            <FormFloatingLabelTextInput
              placeholder={t("travelMart.register.entrepreneur.coordinatorEmail")}
              type="text"
              showClearButton={mode == "create"}
              disabled={mode == "view"}
              isRequired
              name="email"
              control={control}
              errorMessage={errors?.email?.message}
            />
          </Flex.Element>
        </Flex.Container>
        <Flex.Container>
          <Flex.Element>
            <FormFloatingLabelTextInput
              placeholder={t("travelMart.register.entrepreneur.line")}
              type="text"
              showClearButton={mode == "create"}
              name="line"
              disabled={mode == "view"}
              control={control}
              errorMessage={errors?.line?.message}
            />
          </Flex.Element>
          <Flex.Element />
        </Flex.Container>
      </div>
      <div className="flex flex-col">
        <h3 className="font-semibold text-smart-cbt-dark-green">
          {t("travelMart.register.entrepreneur.onlineContactInformation")}
        </h3>
        <Flex.Container>
          <Flex.Element>
            <FormFloatingLabelTextInput
              disabled={mode == "view"}
              placeholder={t("travelMart.register.entrepreneur.website")}
              type="text"
              showClearButton={mode == "create"}
              name="website"
              control={control}
              errorMessage={errors?.website?.message}
            />
          </Flex.Element>
          <Flex.Element>
            <FormFloatingLabelTextInput
              placeholder={t("travelMart.register.entrepreneur.facebook")}
              type="text"
              showClearButton={mode == "create"}
              name="facebook"
              disabled={mode == "view"}
              control={control}
              errorMessage={errors?.facebook?.message}
            />
          </Flex.Element>
        </Flex.Container>
        <Flex.Container>
          <Flex.Element>
            <FormFloatingLabelTextInput
              placeholder={t("travelMart.register.entrepreneur.instagram")}
              type="text"
              showClearButton={mode == "create"}
              disabled={mode == "view"}
              name="instagram"
              control={control}
              errorMessage={errors?.instagram?.message}
            />
          </Flex.Element>
          <Flex.Element>
            <FormFloatingLabelTextInput
              placeholder={t("travelMart.register.entrepreneur.tikTok")}
              type="text"
              showClearButton={mode == "create"}
              name="tikTok"
              disabled={mode == "view"}
              control={control}
              errorMessage={errors?.tikTok?.message}
            />
          </Flex.Element>
        </Flex.Container>
        <Flex.Container>
          <Flex.Element>
            <FormCheckbox
              control={control}
              name="haveOther"
              label={t("travelMart.register.entrepreneur.other")}
              disabled={mode == "view"}
            />
            {showOtherInput && (
              <FormFloatingLabelTextInput
                placeholder={t("travelMart.register.entrepreneur.other")}
                type="text"
                showClearButton={mode == "create"}
                disabled={mode == "view"}
                name="other"
                control={control}
                errorMessage={errors?.other?.message}
              />
            )}
          </Flex.Element>
        </Flex.Container>
      </div>
    </div>
  );
};

export default TravelMartRegisterEntrepreneurStep1;
