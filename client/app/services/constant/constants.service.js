export default class Constants {

  constructor () {

    this.profile = this.profileConstants();

  }

  profileConstants () {
    const profileConstants = {

      serviceTypes: [
        {
          type: '1',
          name: 'Prime XX',
          price: 250,
          description: '',
          img: '/assets/images/services/prime_xx.png',
          active: false
        },
        {
          type: '2',
          name: 'Prime X',
          price: 150,
          description: '',
          img: '/assets/images/services/prime.png',
          active: false
        },
        {
          type: '3',
          name: 'Prime',
          price: 50,
          description: '',
          img: '/assets/images/services/prime.png',
          active: false
        }
      ],

      images: {
        customer: [{file: ''}],
        provider: [
          {file: ''},
          {file: ''},
          {file: ''}
        ]
      },

      fields: {
        customer: [
          {
            combined: [
              {
                name: 'First Name',
                model: 'first_name',
                type: 'text'
              },
              {
                name: 'Last Name',
                model: 'last_name',
                type: 'text'
              }
            ]
          },
          {
            name: 'Phone Number',
            model: 'phone',
            type: 'tel'
          },
          {
            name: 'Email',
            model: 'email',
            type: 'email'
          }
        ],
        provider: function () {
          this.provider = _.union([
            {
              name: 'Display Name',
              model: 'displaying_name',
              type: 'text'
            }
          ], this.customer);
          return this;
        }
      }.provider()

    };

    return profileConstants;
  }

}
