import BasicElement from '../util/BasicElement';

export default class FormContainer extends BasicElement {
  constructor() {
    super({
      classList: 'd-block',
      target: 'header',
      style: {
        height: '100vh',
        backgroundColor: '#23272aa0',
      },
      classList: 'row align-items-center justify-content-center',
      childsConfig: [
        {
          classList: 'col-md-6',
          childsConfig: [
            {
              classList: 'text-light',
              childsConfig: [
                // Title
                {
                  classList: 'text-center background-light-dark py-2',
                  childsConfig: [
                    {
                      element: 'h4',
                      classList: 'modal-title',
                      text: 'Queue configuration',
                    },
                  ],
                },
                // Body
                {
                  classList: 'modal-body background-light-dark',
                  childsConfig: [
                    {
                      element: 'form',
                      childsConfig: [
                        {
                          classList: 'mb-2',
                          childsConfig: [
                            {
                              element: 'label',
                              classList: 'form-label',
                              text: 'Power of processor (1-70):',
                            },
                            {
                              element: 'input',
                              classList: 'form-control',
                              attributes: {
                                id: 'timeIncreaseLife',
                                type: 'number',
                                min: '1',
                                max: '70',
                                value: '10',
                              },
                            },
                          ],
                        },
                        {
                          classList: 'mb-2',
                          childsConfig: [
                            {
                              element: 'label',
                              text: 'Queue order',
                            },
                            {
                              element: 'select',
                              classList: 'form-select',
                              childsConfig: [
                                {
                                  element: 'option',
                                  text: 'Small First',
                                  attributes: {
                                    value: 'smallFirst',
                                  },
                                },
                                {
                                  element: 'option',
                                  text: 'Biggest First',
                                  attributes: {
                                    value: 'biggestFirst',
                                  },
                                },
                              ],
                            },
                          ],
                        },
                        {
                          classList: 'mb-2 form-check form-switch',
                          childsConfig: [
                            {
                              element: 'label',
                              classList: 'form-check-label',
                              text: 'Switch process',
                            },
                            {
                              element: 'input',
                              classList: 'form-check-input',
                              attributes: {
                                type: 'checkbox',
                                id: 'switchProcess',
                                checked: 'true',
                              },
                            },
                          ],
                        },
                        {
                          classList: 'mb-2',
                          childsConfig: [
                            {
                              element: 'h5',
                              classList: 'my-3 text-center',
                              text: 'Process ammount',
                            },
                            {
                              classList: 'd-flex',
                              childsConfig: [
                                {
                                  childsConfig: [
                                    {
                                      element: 'label',
                                      classList: 'form-label',
                                      text: 'Big process "cow"',
                                    },
                                    {
                                      element: 'input',
                                      classList: 'form-range',
                                      attributes: {
                                        type: 'range',
                                        id: 'cowAmmount',
                                        min: '1',
                                        max: '5',
                                        value: '1',
                                      },
                                    },
                                  ],
                                },
                                {
                                  classList: 'offset-2 col-5',
                                  childsConfig: [
                                    {
                                      element: 'label',
                                      classList: 'form-label',
                                      text: 'Big process "pig"',
                                    },
                                    {
                                      element: 'input',
                                      classList: 'form-range',
                                      attributes: {
                                        type: 'range',
                                        id: 'pigAmmount',
                                        min: '1',
                                        max: '5',
                                        value: '1',
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              classList: 'd-flex',
                              childsConfig: [
                                {
                                  childsConfig: [
                                    {
                                      element: 'label',
                                      classList: 'form-label',
                                      text: 'Medium process "sheep"',
                                    },
                                    {
                                      element: 'input',
                                      classList: 'form-range',
                                      attributes: {
                                        type: 'range',
                                        id: 'sheepAmmount',
                                        min: '1',
                                        max: '5',
                                        value: '1',
                                      },
                                    },
                                  ],
                                },
                                {
                                  classList: 'offset-2 col-5',
                                  childsConfig: [
                                    {
                                      element: 'label',
                                      classList: 'form-label',
                                      text: 'Fast process "chicken"',
                                    },
                                    {
                                      element: 'input',
                                      classList: 'form-range',
                                      attributes: {
                                        type: 'range',
                                        id: 'chickenAmmount',
                                        min: '1',
                                        max: '5',
                                        value: '1',
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        // Footer
                        {
                          classList: 'modal-footer background-light-dark',
                          childsConfig: [
                            {
                              element: 'button',
                              classList: 'btn btn-block btn-success m-3',
                              text: 'Start',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  }

  get form() {
    return this.childs[0].childs[0].childs[1].childs[0];
  }

  get powerProcessor() {
    return this.form.childs[0].childs[1].element;
  }

  get queueOrder() {
    for (let basicElement of this.form.childs[1].childs[1].childs) {
      if (basicElement.element.selected) return basicElement.element;
    }
  }

  get switchProcess() {
    return this.form.childs[2].childs[1].element;
  }

  get cowAmmount() {
    return this.form.childs[3].childs[1].childs[0].childs[1].element;
  }

  get pigAmmount() {
    return this.form.childs[3].childs[1].childs[1].childs[1].element;
  }

  get sheepAmmount() {
    return this.form.childs[3].childs[2].childs[0].childs[1].element;
  }

  get chickenAmmount() {
    return this.form.childs[3].childs[2].childs[1].childs[1].element;
  }

  get data() {
    const eat = {
      lifeStepCharge: parseInt(this.powerProcessor.value) || 10,
    };

    return {
      biggestFirst: this.queueOrder.value === 'biggestFirst' ? true : false,
      switchProcess: this.switchProcess.checked,
      animals: {
        cow: {
          ammount: parseInt(this.cowAmmount.value),
          eat,
        },
        pig: {
          ammount: parseInt(this.pigAmmount.value),
          eat,
        },
        sheep: {
          ammount: parseInt(this.sheepAmmount.value),
          eat,
        },
        chicken: {
          ammount: parseInt(this.chickenAmmount.value),
          eat,
        },
      },
    };
  }
}
