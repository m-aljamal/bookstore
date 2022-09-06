export interface ClientProps {
  endPoint: string;
  // customConfig?: object;
  custom: {
    token?: string;
  };
}

const client = async (endpoint: string, { token }: { token?: string } = {}) => {
  const config = {
    method: "GET",
    // ...customConfig
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  const response = await window.fetch(endpoint, config);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    return Promise.reject(data);
  }
};

export { client };
