import type { Request, Response } from "express";
import Lead from "../models/Lead";
import asyncHandler from "../utils/asyncHandler";

export const createLead = asyncHandler(async (req: Request, res: Response) => {
  const lead = await Lead.create(req.body);
  res.status(201).json(lead);
});

export const getLeads = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  const search = req.query.search as string | undefined;
  const status = req.query.status as string | undefined;
  const source = req.query.source as string | undefined;
  const sort = (req.query.sort as string | undefined) || "latest";

  const filter: Record<string, unknown> = {};

  if (status) {
    filter.status = status;
  }

  if (source) {
    filter.source = source;
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const sortOption = sort === "oldest" ? 1 : -1;

  const [leads, total] = await Promise.all([
    Lead.find(filter).sort({ createdAt: sortOption }).skip(skip).limit(limit),
    Lead.countDocuments(filter),
  ]);

  res.status(200).json({
    leads,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalLeads: total,
  });
});

export const getSingleLead = asyncHandler(async (req: Request, res: Response) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    res.status(404);
    throw new Error("Lead not found");
  }

  res.status(200).json(lead);
});

export const updateLead = asyncHandler(async (req: Request, res: Response) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!lead) {
    res.status(404);
    throw new Error("Lead not found");
  }

  res.status(200).json(lead);
});

export const deleteLead = asyncHandler(async (req: Request, res: Response) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);

  if (!lead) {
    res.status(404);
    throw new Error("Lead not found");
  }

  res.status(200).json({ message: "Lead deleted" });
});
