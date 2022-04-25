export async function getMovement(EVA_IP, movement_code){
    try {
        const url = "http://" + EVA_IP + "/api/eva-test/" + movement_code;
        console.log(url);
        const params = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}