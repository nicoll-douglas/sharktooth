import platform, os

def get_bin_dir() -> str:
  """Gets the directory of where any binaries used by the application live.

  Returns:
    str: The absolute path to the directory.

  Raises:
    RuntimeError: If the app binaries don't support the current OS.
  """
  
  system = platform.system().lower()
  is_dev = os.getenv("APP_ENV") == "development"
  base_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..") if is_dev else os.getenv("RESOURCES_PATH")
  bin_dir = os.path.join(base_dir, "bin")

  if "windows" in system:
    return os.path.join(bin_dir, "windows")
  elif "darwin" in system:
    return os.path.join(bin_dir, "macos")
  elif "linux" in system:
    return os.path.join(bin_dir, "linux")
  else:
    raise RuntimeError(f"Unsupported OS: {system}")
# END get_bin_dir