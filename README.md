# WORKSHEET FRONTEND SETUP GUIDE
First of all - run command `npm i`

The frontend is configured in such a way that it can be launched both in the **'Frontend Only'** mode and **'Backend Connected'** mode. 

### Running in 'Frontend Only' Mode
To run the frontend in 'Frontend Only' mode, you need to set the environment variable:  
<pre>
VITE_IS_SINGLE_FRONTEND_MODE=true
</pre>
In this mode:

- The frontend uses data from local JSON files.
- Selected answer options are saved in `sessionStorage`.
- An artificial delay simulates server response time.

### Running 'Backend Connected' Mode
To connect the frontend with the backend, set the environment variables:
<pre>
VITE_IS_SINGLE_FRONTEND_MODE=false
VITE_API_URL=http://localhost:3000/api/v1
</pre>
It is for local testing. If you want testing from a cloud deployment, replace the VITE_API_URL with the deployed backend URL (https://worksheet-be-production.up.railway.app/api/v1).

In Backend mode:

- The frontend fetches a session token and sends requests to the backend as outlined in the requirements.
- The session token is stored in sessionStorage.
- No artificial delays are applied.