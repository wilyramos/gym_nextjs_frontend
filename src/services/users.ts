import "server-only";
import getToken from "../auth/token";
import { GetUsersResponseSchema, UserShema } from "@/src/schemas";



export const getUsers = async () => {

    const token = await getToken();

    console.log("El token", token)

    const url = `${process.env.API_URL}/users`;
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.API_TOKEN}`,
        },
    });

    if (!res.ok) {
        throw new Error("Error fetching users");
    }

    const json = await res.json();
    console.log("Respuesta de la API:", json);

    const data = GetUsersResponseSchema.parse(json);

    return data;
};

export const getTrainers = async () => {
    const token = await getToken();

    const url = `${process.env.API_URL}/users?role=TRAINER`;
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Error fetching trainers");
    }

    const json = await res.json();
    console.log("Respuesta de la API:", json);

    const data = GetUsersResponseSchema.parse(json);

    return data;

}


export const getUserById = async (userId: number) => {
    const token = await getToken();

    const url = `${process.env.API_URL}/users/${userId}`;
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Error fetching user");
    }



    const json = await res.json();

    if (!json) {
        throw new Error("User not found");
    }

    const data = UserShema.parse(json);
    return data;

}


