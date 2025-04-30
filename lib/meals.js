import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // developing purpose only
    // throw new Error('Failed to fetch meals data'); -> developing purpose only
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const extention = meal.image.name.split('.').pop();
    const filename = `${meal.slug}.${extention}`;

    const stream = fs.createWriteStream(`./public/images/${filename}`);
    const buffredImage = Buffer.from(await meal.image.arrayBuffer());

    stream.write(buffredImage, (error) => {
        if (error) throw new Error('Saving image failed!');
    });

    meal.image = `/images/${filename}`;
    db.prepare(`
        INSERT INTO meals (
            title,
            summary,
            instructions,
            creator,
            creator_email,
            image,
            slug
        ) VALUES (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
    `).run(meal);
}
