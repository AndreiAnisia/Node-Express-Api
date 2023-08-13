import { Request, Response, NextFunction } from 'express';

export type CustomController = (req: Request, res: Response) => void;

export type CustomMiddleware = (req: Request, res: Response, next: NextFunction) => void;

export type ErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => void;
