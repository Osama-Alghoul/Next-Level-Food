import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // developing purpose only
    // throw new Error('Failed to fetch meals data'); -> developing purpose only
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}