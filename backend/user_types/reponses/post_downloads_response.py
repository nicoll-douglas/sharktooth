class PostDownloadsResponse:
  """Class that contains nested classes to be used as models for responses to the POST /downloads endpoint.
  """

  class BadRequest:
    """Represents the response body for a 400 status code response to a POST /downloads request.

    Attributes:
      field (str): The first field that failed request validation; will match a key in a download in the item (download) list.
      message (str): A user-friendly message indicating the validation error.
      item_index (int | None): The index of the first item that caused validation to fail.
    """
    
    field: str
    message: str
    item_index: int | None

  # END class BadRequest


  class Ok:
    """Represents the response body for a 200 status code response to a POST /downloads request.

    Attributes:
      download_ids (list[int]): The database IDs of the downloads that were freshly queued and inserted into the database.
      message (str): A user-friendly message.
    """

    download_ids: list[int]
    message: str

    
    def __init__(self):
      self.message = "Your downloads have been queued and should start shortly."
    # END __init__
    
  # END class Ok

# END class PostDownloadsResponse