import api from "../api/axios";
import type { Lead, LeadFilters, LeadListResponse, LeadPayload } from "../types/lead";

export const getLeads = async (filters: LeadFilters) => {
  const params = {
    page: filters.page,
    search: filters.search || undefined,
    status: filters.status || undefined,
    source: filters.source || undefined,
    sort: filters.sort,
  };

  const { data } = await api.get<LeadListResponse>("/leads", { params });
  return data;
};

export const createLead = async (payload: LeadPayload) => {
  const { data } = await api.post<Lead>("/leads", payload);
  return data;
};

export const updateLead = async (id: string, payload: LeadPayload) => {
  const { data } = await api.put<Lead>(`/leads/${id}`, payload);
  return data;
};

export const deleteLead = async (id: string) => {
  const { data } = await api.delete<{ message: string }>(`/leads/${id}`);
  return data;
};
