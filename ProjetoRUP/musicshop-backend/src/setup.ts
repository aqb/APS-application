import { container } from "tsyringe";

import FabricaRepositoriosInMemory from "./negocio/FabricaRepositoriosInMemory";
import IFabricaRepositorios from "./negocio/IFabricaRepositorios";

container.register<IFabricaRepositorios>("FabricaRepositorios", {
  useClass: FabricaRepositoriosInMemory
});
