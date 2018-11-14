class Orientation {
  constructor ({ alpha = 0, beta = 0, gamma = 0 } = {}) {
    this.alpha = alpha
    this.beta = beta
    this.gamma = gamma
  }

  update ({ alpha, beta, gamma }) {
    if (alpha) this.alpha = alpha
    if (beta) this.beta = beta
    if (gamma) this.gamma = gamma
  }

  getDifferenceTo ({ alpha = 0, beta = 0, gamma = 0 } = {}) {
    return {
      alpha: 0 - this.alpha + alpha,
      beta: this.beta - beta,
      gamma: this.gamma - gamma
    }
  }
}

export default Orientation
