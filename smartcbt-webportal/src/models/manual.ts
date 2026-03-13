export type Manual = {
  application_code?: string | null;
  id?: number | null;
  href?: string | null;
  width?: number | null;
  height?: number | null;
  title?: string | null;
  date_updated?: string | null;
  application_manual?: ApplicationManual | null;
  icon?: {
    id?: string | null;
    url?: string | null;
    title?: string | null;
    type?: string | null;
  };
};

export type ApplicationManual = {
  id?: string | null;
  url?: string | null;
  title?: string | null;
  type?: string | null;
};

export type CbtManual = {
  id?: number | null;
  type?: string | null;
  title?: string | null;
  width?: number | null;
  height?: number | null;
  date_updated?: string | null;
  manual?: ApplicationManual | null;
  icon?: Icon | null;
};

export type Icon = {
  id?: string | null;
  url?: string | null;
  title?: string | null;
  type?: string | null;
};
