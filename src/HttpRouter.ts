import BusinessGuard from '@businessGuard/BusinessGuard';
import { Router } from 'express';

export default abstract class HttpRouter {
    protected readonly guard: BusinessGuard = new BusinessGuard()
    abstract router(): Router
}