Rails.configuration.stripe = {
    :publishable_key => "pk_test_n4ZwbQ5wCL6VkSQ7Q8ujOcm300WAxOjS1W",
    :secret_key => "sk_test_GaJce7tbHQ3kTgIqBPdpLl4x00ysIkm78h"
}
Stripe.api_key = Rails.configuration.stripe[:secret_key]