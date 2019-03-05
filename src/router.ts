class Route {
  public slug: string
  public method: string
  public middleware: Array<Function>
  public controller: Function

  constructor(args: Route) {
    this.slug = args.slug
    this.method = args.method
    this.middleware = args.middleware
    this.controller = args.controller

    return this
  }
}

export default Route
