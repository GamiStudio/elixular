defmodule Elixular.PageController do
  use Elixular.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
