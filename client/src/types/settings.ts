
export interface SmtpSettings{
    host?:string
}
export interface UpdateSMTPPayload{
    host?:string
}

export interface UpdateBrandingPayload{
    companyName?:string
}
export interface ApiKey{
    apiKey: string;
}
export interface UpdateGeneralPayload {
  companyName?: string;
}

export interface Settings{
  companyName?:string,
  smtp?:SmtpSettings,
  branding?:UpdateBrandingPayload,
  apiKeys:ApiKey[],
}
export interface SettingsState {
  settings: Settings | null;
  loading: boolean;
  error: string | null | undefined;
}
export interface SettingsResponse{
    settings:Settings | null
}