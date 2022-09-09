import { logout } from "./auth-provider";
export interface ClientProps {
  endPoint: string;
  // customConfig?: object;
  custom: {
    token?: string;
  };
}

const client = async (
  endpoint: string,
  { token, postData }: { token?: string; postData?: object } = {}
) => {
  const config = {
    method: postData ? "POST" : "GET",
    body: postData ? JSON.stringify(postData) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": postData ? "application/json" : "",
    },
  };

  const response = await window.fetch(endpoint, config);
  if (response.status === 401) {
    await logout();
    window.location.assign(window.location.href);
    return Promise.reject({ message: "Please re-authenticate." });
  }
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    return Promise.reject(data);
  }
};

export { client };
