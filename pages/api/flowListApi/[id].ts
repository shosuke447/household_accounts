import { findFlowItem, deleteFlowItem } from "../../../db/FlowListDB"

export default async function handler(req:any, res:any) {
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    case 'GET':
      try {
        const flowItem = await findFlowItem(id)
        if (!flowItem) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: flowItem })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'DELETE':
      try {
        const deletedFlowItem = await deleteFlowItem(id)
        if (!deletedFlowItem) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}