import Consul from "consul";

const consul = new Consul({
  host: "discovery",
  port: "8500"
});

export default consul;
