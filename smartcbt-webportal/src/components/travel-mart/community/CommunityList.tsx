"use client";

import { useState } from "react";

import { ArrowLeftIcon, MaterialSymbolsAddRounded } from "@/components/Icon";
import { NextLink } from "@/components/Link";
import { COMMUNITY_STATUS } from "@/utils/cms/adapters/website/constants";
import { COMMUNITY_STATUS_VALUE } from "@/utils/cms/adapters/website/travel-mart/types/communities";
import { Community } from "@/utils/cms/adapters/website/travel-mart/types/travel-mart";
import { useTranslations } from "next-intl";
import CommunityListApproved from "./CommunityListApproved";
import CommunityListDraft from "./CommunityListDraft";
import CommunityListRejected from "./CommunityListRejected";
import CommunityListWaitingForApprove from "./CommunityListWaitingForApprove";
import { CommunityStatusTab } from "./CommunityStatusTab";

type CommunityListProps = {
  draftCommunities: Community[];
  pendingCommunities: Community[];
  publishedCommunities: Community[];
  rejectCommunities: Community[];
};

const CommunityList = ({
  draftCommunities,
  pendingCommunities,
  publishedCommunities,
  rejectCommunities,
}: CommunityListProps) => {
  const t = useTranslations("common");
  const tabs: CommunityStatusTab[] = [
    {
      key: COMMUNITY_STATUS.PUBLISHED,
      name: t("community.info.tabs.status.approved"),
      count: publishedCommunities.length,
    },
    {
      key: COMMUNITY_STATUS.PENDING,
      name: t("community.info.tabs.status.waitingForApprove"),
      count: pendingCommunities.length,
    },
    {
      key: COMMUNITY_STATUS.REJECT,
      name: t("community.info.tabs.status.rejected"),
      count: rejectCommunities.length,
    },
    {
      key: COMMUNITY_STATUS.DRAFT,
      name: t("community.info.tabs.status.draft"),
      count: draftCommunities.length,
    },
  ];
  const [mode, setMode] = useState<COMMUNITY_STATUS_VALUE>(COMMUNITY_STATUS.PUBLISHED);

  return (
    <div className="px-4 pt-6 md:container md:mx-auto">
      <div className="flex flex-col flex-1 w-full gap-4">
        <div className="flex justify-between ">
          <div>
            <NextLink intent={"whiteButton"} icon={<ArrowLeftIcon />} href={""}>
              {t("community.info.title")}
            </NextLink>
          </div>
          <div className="flex items-center gap-2 md:justify-end">
            <NextLink
              className="rounded-3xl"
              intent={"whiteButtonBordered"}
              icon={<MaterialSymbolsAddRounded />}
              href="/travel-mart/community-infos/create"
            >
              {t("community.info.add")}
            </NextLink>
          </div>
        </div>
        <CommunityStatusTab tabs={tabs} selectedIndex={1} onChange={(status, selectedIndex) => setMode(status)}>
          {mode == COMMUNITY_STATUS.PUBLISHED && <CommunityListApproved communities={publishedCommunities} />}
          {mode == COMMUNITY_STATUS.PENDING && <CommunityListWaitingForApprove communities={pendingCommunities} />}
          {mode == COMMUNITY_STATUS.REJECT && <CommunityListRejected communities={rejectCommunities} />}
          {mode == COMMUNITY_STATUS.DRAFT && <CommunityListDraft communities={draftCommunities} />}
        </CommunityStatusTab>
      </div>
    </div>
  );
};

export default CommunityList;
