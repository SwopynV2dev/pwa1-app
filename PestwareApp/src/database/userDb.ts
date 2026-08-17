import { db } from "./db";
import { LocalUser } from "./models";

export const saveUserLocal = (user: LocalUser) => {
    db.runSync(
        `INSERT OR REPLACE INTO user
        (id, name, email, cellphone, token, companie, profile_photo)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            user.id,
            user.name,
            user.email,
            user.cellphone ?? null,
            user.token ?? null,
            user.companie ?? null,
            user.profile_photo ?? null,
        ]
    );
};

export const getLocalUser = () => {
    return db.getFirstSync<LocalUser>("SELECT * FROM user");
};

export const deleteLocalUser = () => {
    db.runSync("DELETE FROM user");
};