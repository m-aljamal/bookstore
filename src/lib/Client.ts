export interface ClientProps {
  endPoint: string;
  customConfig?: object;
}

const client = ({ customConfig = {}, endPoint }: ClientProps) => {
  const config = {
    method: "GET",
    ...customConfig,
  };
  return window.fetch(endPoint, config).then((response) => response.json());
};

export { client };
