const fs = require('fs').promises; // promises သုံးဖို့ ပြောင်းလဲထားပါတယ်

const getAllTasks = async () => {
    try {
        // await သုံးပြီး ဖတ်လို့ပြီးတဲ့အထိ စောင့်ခိုင်းထားပါတယ်
		const data = await fs.readFile('./data/data.json', 'utf8');
		console.log(data)
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading file:", err);
        return [];
    }
}

module.exports = { getAllTasks };
