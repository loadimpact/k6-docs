const extensions = [
  {
    name: 'xk6-kafka',
    description: 'Load test Apache Kafka. With support for Avro messages',
    url: 'https://github.com/mostafa/xk6-kafka',
    logo:
      'https://github.com/mostafa/xk6-kafka/blob/1259557afd378a5fe236e19c3d09bda401584ee6/assets/kafka-logo.png',
    author: {
      name: 'Mostafa Moradian',
      url: 'https://github.com/mostafa',
    },
    official: false,
    categories: ['clients', 'protocols'],
  },
  {
    name: 'xk6-notification',
    description: 'A k6 extension for creating notifications.',
    url: 'https://github.com/dgzlopes/xk6-notification',
    logo: '',
    author: {
      name: 'Daniel González',
      url: 'https://github.com/dgzlopes',
    },
    official: false,
    categories: [],
  },
  {
    name: 'xk6-chaos',
    description: 'xk6 extension for running chaos experiments with k6 💣',
    url: 'https://github.com/simskij/xk6-chaos',
    logo:
      'https://github.com/simskij/xk6-chaos/blob/064932e0bae64fe94de2f86bf3c41be18fbab1d6/assets/logo.png',
    author: {
      name: 'Simon Aronsson',
      url: 'https://github.com/simskij',
    },
    official: false,
    categories: [],
  },
  {
    name: 'xk6-sql',
    description:
      'k6 Plugin to Load Test SQL Servers (PostgreSQL, MySQL and SQLite3 for now)',
    url: 'https://github.com/imiric/xk6-sql',
    logo: '',
    author: {
      name: 'Ivan Mirić',
      url: 'https://github.com/imiric',
    },
    official: false,
    categories: ['clients'],
  },
  {
    name: 'xk6-redis',
    description: 'A k6 extension for Redis.',
    url: 'https://github.com/dgzlopes/xk6-redis',
    logo: '',
    author: {
      name: 'Daniel González',
      url: 'https://github.com/dgzlopes',
    },
    official: false,
    categories: ['clients'],
  },
  {
    name: 'xk6-say',
    description: 'A k6 extension to say hello.',
    url: 'https://github.com/dgzlopes/xk6-say',
    logo: '',
    author: {
      name: 'Daniel González',
      url: 'https://github.com/dgzlopes',
    },
    official: false,
    categories: [],
  },
  {
    name: 'xk6-distributed-tracing',
    description: 'A k6 extension for distributed tracing.',
    url: 'https://github.com/k6io/xk6-distributed-tracing',
    logo: '',
    author: {
      name: '',
      url: '',
    },
    official: false,
    categories: [],
  },
  {
    name: 'xk6-zmq',
    description: 'A k6 extension for ZeroMQ.',
    url: 'https://github.com/dgzlopes/xk6-zmq',
    logo: '',
    author: {
      name: 'Daniel González',
      url: 'https://github.com/dgzlopes',
    },
    official: false,
    categories: ['clients'],
  },
  {
    name: 'xk6-datadog',
    description: 'A k6 extension for querying Datadog metrics.',
    url: 'https://github.com/dgzlopes/xk6-datadog',
    logo: '',
    author: {
      name: 'Daniel González',
      url: 'https://github.com/dgzlopes',
    },
    official: false,
    categories: ['clients'],
  },
  {
    name: 'xk6-exec',
    description: 'A k6 extension for running external commands.',
    url: 'https://github.com/k6io/xk6-exec',
    logo: '',
    author: {
      name: 'Daniel González',
      url: 'https://github.com/dgzlopes',
    },
    official: false,
    categories: [],
  },
  {
    name: 'xk6-interpret',
    description: 'A k6 extension for interpreting Go code.',
    url: 'https://github.com/dgzlopes/xk6-interpret',
    logo: '',
    author: {
      name: 'Daniel González',
      url: 'https://github.com/dgzlopes',
    },
    official: false,
    categories: [],
  },
  {
    name: 'xk6-sqs',
    description: 'A k6 extension to produce to an SQS queue.',
    url: 'https://github.com/mridehalgh/xk6-sqs',
    logo: '',
    author: {
      name: 'Matthew Ridehalgh',
      url: 'https://github.com/mridehalgh',
    },
    official: false,
    categories: ['Clients'],
  },
  {
    name: 'xk6-file',
    description: 'k6 extension for writing files.',
    url: 'https://github.com/avitalique/xk6-file',
    docs: '',
    issues: '',
    logo: '',
    author: {
      name: 'Vitali Asheichyk',
      url: 'https://github.com/avitalique',
    },
    official: false,
    categories: [],
  },
  {
    name: 'xk6-wamp',
    description: 'A k6 extension that adds support for WAMP protocol.',
    url: 'https://github.com/vvarp/xk6-wamp',
    logo: '',
    author: {
      name: 'Maciek Szczesniak',
      url: 'https://github.com/vvarp',
    },
    official: false,
    categories: [],
  },
  {
    name: 'xk6-mqtt',
    description: 'k6 mqtt extension',
    url: 'https://github.com/pmalhaire/xk6-mqtt',
    logo: '',
    author: {
      name: 'pmalhaire',
      url: 'https://github.com/pmalhaire',
    },
    official: false,
    categories: ['clients'],
  },
  {
    name: 'xk6-kv',
    description: 'A k6 extension to share key-value data between VUs.',
    url: 'https://github.com/dgzlopes/xk6-kv',
    logo: '',
    author: {
      name: 'Daniel González',
      url: 'https://github.com/dgzlopes',
    },
    official: false,
    categories: [],
  },
  {
    name: 'xk6-url',
    description: 'A k6 extension for URL parsing and normalization.',
    url: 'https://github.com/dgzlopes/xk6-url',
    logo: '',
    author: {
      name: 'Daniel González',
      url: 'https://github.com/dgzlopes',
    },
    official: false,
    categories: [],
  },
  {
    name: 'xk6-kubernetes-jobs',
    description: 'A k6 extension to interact with Kubernetes jobs.',
    url: 'https://github.com/dgzlopes/xk6-kubernetes-jobs',
    logo: '',
    author: {
      name: 'Daniel González',
      url: 'https://github.com/dgzlopes',
    },
    official: false,
    categories: [],
  },
  {
    name: 'xk6-remote-write',
    description: 'A k6 extension for Prometheus Remote Write.',
    url: 'https://github.com/dgzlopes/xk6-remote-write',
    logo: '',
    author: {
      name: 'Daniel González',
      url: 'https://github.com/dgzlopes',
    },
    official: false,
    categories: [],
  },
  {
    name: 'xk6-influxdbv2',
    description: 'A k6 extension output to influxdb.',
    url: 'https://github.com/li-zhixin/xk6-influxdbv2',
    logo: '',
    author: {
      name: 'li-zhixin',
      url: 'https://github.com/li-zhixin',
    },
    official: false,
    categories: [],
  },
  {
    name: 'xk6-pubsub',
    description: 'A k6 extension for Google PubSub.',
    url: 'https://github.com/olvod/xk6-pubsub',
    logo: '',
    author: {
      name: 'Oleksii Vodotyiets',
      url: 'https://github.com/olvod',
    },
    official: false,
    categories: [],
  },
  {
    name: 'xk6-mllp',
    description: 'Simple MLLP sender for K6',
    url: 'https://github.com/gjergjsheldija/xk6-mllp',
    logo: '',
    author: {
      name: 'Gjergj Sheldija',
      url: 'https://github.com/gjergjsheldija',
    },
    official: false,
    categories: [],
  },
  {
    name: 'xk6-encoding',
    description: '',
    url: 'https://github.com/MStoykov/xk6-encoding',
    logo: '',
    author: {
      name: 'Mihail Stoykov',
      url: 'https://github.com/MStoykov',
    },
    official: false,
    categories: [],
  },
  {
    name: 'xk6-counter',
    description: '',
    url: 'https://github.com/MStoykov/xk6-counter',
    logo: '',
    author: {
      name: 'Mihail Stoykov',
      url: 'https://github.com/MStoykov',
    },
    official: false,
    categories: [],
  },
];

export default extensions;
