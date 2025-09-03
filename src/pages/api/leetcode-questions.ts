import { NextApiRequest, NextApiResponse } from 'next';
import { leetcodeQuestions } from '../../data/leetcodeQuestions';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    total: leetcodeQuestions.length,
    questions: leetcodeQuestions,
  });
}
