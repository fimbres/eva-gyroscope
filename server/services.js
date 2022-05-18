export async function getMovement(evaIpAddress, movementCode){
    try {
        const url = "http://" + evaIpAddress + "/nodes";
        const params = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({type: 'mov', mov: movementCode})
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}