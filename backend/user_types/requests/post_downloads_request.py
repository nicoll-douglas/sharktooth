from ..new_download import NewDownload

class PostDownloadsRequest:
  """Type that represents a validated request body to endpoint POST /downloads.

  Attributes:
    downloads (list[NewDownload]): The list of new downloads to queue.
  """
  
  downloads: list[NewDownload]
  
# END class PostDownloadsRequest