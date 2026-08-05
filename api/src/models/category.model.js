const path = require("path");
const fs = require("fs").promises;
const CAT_DATA = path.join(__dirname, "..", "..", "data", "categories.json");

async function readData() {
    const data = await fs.readFile(CAT_DATA, "utf8");
    return data ? JSON.parse(data) : [];
  }
  
async function writeData(data) {
    return await fs.writeFile(CAT_DATA, JSON.stringify(data, null, 2), 'utf-8');
  }

exports.findAll = async () => {
    const categories = await readData();
    return categories ? categories : [];
}

exports.findById = async (id) => {
    const categories = await readData();
    const category = categories.find((category) => category.id === id );
    return category || null;
}

exports.save = async (data) => {
    return await writeData(data);
}

exports.remove = async (id) => {
    const categories = await readData();
    const remaining = categories.filter((category) => category && category.id !== id);
    await writeData(remaining);
    return remaining.length < categories.length;
}

exports.update = async (id, updateData) => {
    const categories = await readData();
    const categoryIndex = categories.findIndex((category) => category.id === id);
    if (categoryIndex === -1) throw new Error("Category not found.");
    categories[categoryIndex] = { ...categories[categoryIndex], ...updateData };
    await writeData(categories);
    return categories[categoryIndex];
}
