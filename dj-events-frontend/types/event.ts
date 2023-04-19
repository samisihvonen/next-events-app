export interface Event {
  id: Number;
  attributes: {
    name: String;
    slug: String;
    venue: String;
    address: String;
    performers: String;
    date: String;
    time: String;
    description: String;
    image: {
      data: {
        attributes: {
          formats: {
            medium: {
              url: String
            }
            thumbnail: {
              url: String
            }
          }
        }
      }

    };
  }
}

export interface ResponseData {
  data: Event[],
  meta: {
    pagination: {
      page: Number,
      pageSize: Number,
      pageCount: Number,
      total: Number
    }
  }
}

export interface Props {
  events: Event[];
}


export type QueryType = {
  query: Slug
}

export type ParamsType = {
  params: Slug
}

export type Slug = {
  slug: String
}