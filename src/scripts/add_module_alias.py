import os
import json

def update_package_json(alias):
  """ Update package.json
  :param str alis: Path alias
  :return:
  """
  try:
    dirname = os.path.abspath(os.path.dirname(__file__))
    file_path  = os.path.join(dirname, "../../package.json")

    with open(file_path, "r") as f:
      pkg = json.loads(f.read())
      aliases = pkg.get("_moduleAliases")

      if not aliases.get(f"@{alias}"):
        aliases[f"@{alias}"] = f"src/{alias}"
        pkg["_moduleAliases"] = aliases
        
        with open(file_path, "w") as f:
          json.dump(pkg, f, ensure_ascii=False, indent=2)
          print("✅ package.json")

  except ValueError as e:
    print("ValueError - ", e)

def update_ts_config(alias):
  """ Update tsconfig.json
  :param str alis: Path alias
  :return:
  """
  try:
    dirname = os.path.abspath(os.path.dirname(__file__))
    file_path  = os.path.join(dirname, "../../tsconfig.json")
    
    with open(file_path, "r") as f:
      config = json.loads(f.read())
      paths = config["compilerOptions"]["paths"]

      if not paths.get(f"@{alias}/*"):
        paths[f"@{alias}/*"] = [f"{alias}/*"]
        config["compilerOptions"]["paths"]= paths
        
        with open(file_path, "w") as f:
          json.dump(config, f, ensure_ascii=False, indent=2)
          print("✅ tsconfig.json")

  except ValueError as e:
    print("ValueError - ", e)


if __name__ == "__main__":
  # TODO Get user params
  alias = "ye"
  path = "src/ye"
  update_package_json(alias)
  update_ts_config(alias)

  