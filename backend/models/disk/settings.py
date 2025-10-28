import os, json

class Settings:
  """Model class to interface with application settings file.

  Attributes:
    PATH (str): The path to the settings file.
  """
  
  PATH = os.path.join(os.getenv("USER_DATA_DIR"), "settings.json")


  @classmethod
  def load(cls) -> dict | None:
    """Reads and loads the current application settings file.

    Returns:
      (dict | None): None if an exception ocurred, otherwise the parsed JSON data.
    """
    
    try:
      with open(cls.PATH, "r", encoding="utf-8") as file:
        data = json.load(file)

      if not isinstance(data, dict):
        return None
      
      return data
    except Exception:
      return None
  # END load


  @classmethod
  def set(cls, data: dict) -> bool:
    """Overwrites the application settings file with a new settings configuration.

    Args:
      data (dict): The new settings data with which to overwrite.

    Returns:
      bool: True if write was a success, False otherwise.
    """
    
    try:
      with open(cls.PATH, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=2)

      return True
    except Exception:
      return False
  # END set


  @classmethod
  def update(cls, updated_settings: dict) -> bool:
    """Updates the settings file with updated or new configurations passed.

    Args:
      updated_settings (dict): New or updated configurations.

    Returns:
      bool: True if the settings were successfully updated, False otherwise.
    """
    
    current_settings = cls.load()

    if current_settings is None:
      return False
    
    new_settings = { **current_settings, **updated_settings }

    return cls.set(new_settings)
  # END update


  @classmethod
  def update_tokens(
    cls, 
    access_token: str | None, 
    refresh_token: str | None,
    access_token_duration: int | None
  ) -> bool:
    """Updates token data in the application settings.

    Args:
      access_token (str | None): A new access token.
      refresh_token (str | None): A new access token.
      access_token_duration (int | None): A new access token duration.
    """

    return cls.update({
      "access_token": access_token,
      "access_token_duration": access_token_duration,
      "refresh_token": refresh_token
    })
  # END update_tokens

# END class Settings