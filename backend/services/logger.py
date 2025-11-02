import logging, sys, os

LOG_LEVEL = logging.DEBUG if os.getenv("APP_ENV") == "development" else logging.INFO

logger = logging.getLogger("backend")
logger.setLevel(LOG_LEVEL)

if not logger.hasHandlers():
  stdout_handler = logging.StreamHandler(sys.stdout)

  formatter = logging.Formatter(
    fmt="%(levelname)s|%(message)s",
  )

  stdout_handler.setFormatter(formatter)
  logger.addHandler(stdout_handler)