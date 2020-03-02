import Express from 'express';

const router = Express.Router()

router.get('/', (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.json({ "test": "hello" })
})

router.get('/a', (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.json({ "test": "hello" })
})

export default router;