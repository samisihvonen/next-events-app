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
export type EventImage = {
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

export interface AddEventForm {
  name: string;
  performers: string;
  venue: string;
  address: string;
  date: string;
  time: string;
  description: string;
}


export interface EditEventForm {
  id: string;
  image: any;
  name: string;
  performers: string;
  venue: string;
  address: string;
  date: string;
  time: string;
  description: string;
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
