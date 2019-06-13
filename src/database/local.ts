import {
  AccessTokenInfo,
} from './model'

interface Store {
  token: AccessTokenInfo | null
}

const store: Store = {
  token: null
}

export default store