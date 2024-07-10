
function getUserID() {
    // Step 1: Retrieve the token from local storage
    const token = localStorage.getItem('token'); // Assuming you stored it with the key 'token'

    // Step 2: Decode the token to get the payload
    // A JWT token consists of three parts separated by dots: header, payload, and signature
    // We're interested in the payload, which is the second part
    const base64Url = token.split('.')[1]; // Get the payload part
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Convert base64url to base64
    const payload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    // Step 3: Parse the payload
    const parsedPayload = JSON.parse(payload);

    // Access the userId from the parsed payload
    const userId = parsedPayload.userId;

    console.log('UserId from get file : ', userId);

    return userId;
}

export default getUserID;