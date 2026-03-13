import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { FieldValues, Resolver } from "react-hook-form";
import { z } from "zod";

export const zodErrorMap = (): z.ZodErrorMap => {
  const t = useTranslations("errors");
  return (issue: any, _ctx) => {
    const errorKey = issue.params?.i18n;
    if (errorKey) {
      return { message: t(errorKey) };
    } else if (issue.type) {
      const errorKey = [
        issue.code,
        issue.type,
        issue.inclusive ? "inclusive" : null,
        issue.exact ? "exact" : null,
        issue.not_inclusive ? "not_inclusive" : null,
      ]
        .filter((a) => a != null)
        .join(".");
      return { message: t(errorKey, issue) };
    } else if (issue.validation) {
      return { message: t(`${issue.code}.${issue.validation}`, issue) };
    }
    return { message: t(issue.code, issue) };
  };
};

export const customZodResolver = <
  T extends z.Schema<any, any>,
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
>(
  schema: T
): Resolver<TFieldValues, TContext> => {
  return zodResolver(schema, { errorMap: zodErrorMap() });
};
