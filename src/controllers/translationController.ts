import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

export const aboutus = asyncHandler(async (req: Request, res: Response) => {
  const t = req.t; // Translation function attached to the request

  res.status(200).json({
    title: t('aboutUs'),
    intro: t('content.intro')
  });
});

