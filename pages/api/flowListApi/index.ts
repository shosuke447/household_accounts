import { getFlowList, saveFlowList } from "../../../db/FlowListDB"

export default async function handler(req:any, res:any) {
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                const flowList = await getFlowList();
                res.status(200).json({success: true, data: flowList})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'POST':
            try {
              const result = await saveFlowList(req.body)
              res.status(201).json({ success: true, data: result })
            } catch (error) {
              console.log(error);
              res.status(400).json({success: false})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}