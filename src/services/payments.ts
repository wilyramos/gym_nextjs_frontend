import "server-only";
import getToken from "../auth/token";
import { GetPaymentsResponseSchema, type GetPaymentsResponseDto } from "@/src/schemas";

export const getPayments = async () => {

    const token = await getToken();

    const url = `${process.env.API_URL}/payments`;
    console.log(url)

    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Error fetching payments");
    }



    const json = await res.json();
    console.log("datos de json", json);

    const data = GetPaymentsResponseSchema.parse(json);

    return data;
};
