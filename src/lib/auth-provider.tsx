import React from "react";
import { FormData } from "lib/types";
import { client as authClient } from "./Client";
const localStorageKey = "__auth_provider_token__";

async function getToken() {
  return window.localStorage.getItem(localStorageKey);
}

async function handleUserResponse({ token }: { token: string }) {
  window.localStorage.setItem(localStorageKey, token || "");
  let user = await currentUser(token);

  
  console.log("handle", user, token);
  
  return { ...user, token };
}

async function currentUser(token: string) {
  const user = await authClient("http://localhost:3001/auth/me", { token });
  return user;
}

async function login({ email, password }: FormData) {
  return client({
    data: { email, password },
    endpoint: "login",
  }).then(handleUserResponse);
}

async function logout() {
  window.localStorage.removeItem(localStorageKey);
}

const authUrl = "http://localhost:3001/auth";
async function client({
  endpoint,
  data,
}: {
  endpoint: string;
  data: FormData;
}) {
  const config = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return window
    .fetch(`${authUrl}/${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export { login, getToken, logout };
