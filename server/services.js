export async function getMovement(EVA_IP, movement_code){
    try {
        const url = "http://" + EVA_IP + "/nodes";
        const params = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({type: 'mov', mov: movement_code})
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}