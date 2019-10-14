import os
import sys
import json

def update_package_json(alias, path):
  """ Update package.json
  :param str alias: Alias name
  :param str path: Path to alias
  :return:
  """
  try:
    dirname = os.path.abspath(os.path.dirname(__file__))
    file_path  = os.path.join(dirname, "../package.json")

    with open(file_path, "r") as f:
      pkg = json.loads(f.read())
      aliases = pkg.get("_moduleAliases")

      if not aliases.get(f"@{alias}"):
        aliases[f"@{alias}"] = f"{path}"
        pkg["_moduleAliases"] = aliases
        
        with open(file_path, "w") as f:
          json.dump(pkg, f, ensure_ascii=False, indent=2)
          print("✅ package.json")

  except ValueError as e:
    print("ValueError - ", e)

def update_ts_config(alias, path):
  """ Update tsconfig.json
  :param str alias: Alias name
  :param str path: Path to alias
  :return:
  """
  try:
    dirname = os.path.abspath(os.path.dirname(__file__))
    file_path  = os.path.join(dirname, "../tsconfig.json")
    
    with open(file_path, "r") as f:
      config = json.loads(f.read())
      paths = config["compilerOptions"]["paths"]

      if not paths.get(f"@{alias}/*"):
        # TODO Remove src/ from path
        if "src" in path:
          path = path.split("src/")[1]

        paths[f"@{alias}/*"] = [f"{path}/*"]
        config["compilerOptions"]["paths"]= paths
        
        with open(file_path, "w") as f:
          json.dump(config, f, ensure_ascii=False, indent=2)
          print("✅ tsconfig.json")

  except ValueError as e:
    print("ValueError - ", e)


if __name__ == "__main__":
  alias = input("Alias - ex: controllers\n> ")
  path = input("Path - ex: src/controllers\n> ")

  if not alias:
    print("> Alias not provided")
    exit(1)

  if not path:
    print("> Path not provided")
    exit(1)

  if "src" not in path:
    print("> Path must start with src/<path_to_alias>")
    exit(1)

  update_package_json(alias, path)
  update_ts_config(alias, path)

  