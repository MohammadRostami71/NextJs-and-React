import fs from 'fs';
import path from 'path';

export function buildFeedbackPath() {
    return path.join(process.cwd(), 'data', 'feedback.json');
}

export function extractFeedback(filePath) {
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    return data;
}

export default function handler(req, res) {
    if (req.method === 'POST') {
        const email = req.body.email;
        const feedback = req.body.feedback;
        const newFeedback = {
            id: new Date().toISOString(),
            email: email,
            feedback: feedback
        };
        //store
        const filePath = buildFeedbackPath();
        const fileData = extractFeedback(filePath);
        const data = JSON.parse(fileData);
        data.push(newFeedback);
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(200).join({message: 'success', feedback: newFeedback})
    } else {
        const filePath = buildFeedbackPath();
        const data = JSON.parse(filePath);
        res.status(200).json({feedback: data});
    }
}