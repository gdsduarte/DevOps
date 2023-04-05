export const fetchData = (url, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
            } else {
                console.error("Failed to fetch data from server");
            }
        }
    };

    xhr.timeout = 10000; // Set the timeout to 10 seconds (10000 milliseconds)
    xhr.ontimeout = function () {
        onError("Request timed out");
    };

    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
};