import { WindowType as CommonWindowType } from '@ktsstudio/mediaproject-utils';

export interface WindowType extends CommonWindowType {
  scope: string | null;
  group_id: string | null;
  page: string | null;
  platform: string;
  is_ok: boolean;
  api_server: string;
  apiconnection: string;
  FAPI: any;
  API_callback: any;
  custom_args: string;
}
