# fill the env file
#sed -i -e 's|REAK_STAGING_SONAR_URL|'"${REAK_STAGING_SONAR_URL}"'|g' docker-staging.env

sudo docker build -f "Dockerfile" -t daffa99/containerd:FE-$TRAVIS_BUILD_NUMBER  --label "Mohammad Daffa <daffa@alterra.id>" .
# push apps image to docker hub
sudo docker push daffa99/containerd:FE-$TRAVIS_BUILD_NUMBER

# go inside kubernetes Server
sed -i -e 's|KUBE_STAGING_CA_CERT|'"${KUBE_STAGING_CA_CERT}"'|g' kubeconfig
sed -i -e 's|KUBE_STAGING_ENDPOINT|'"${KUBE_STAGING_ENDPOINT}"'|g' kubeconfig

# set config for aws kredential
sed -i -e 's|AWS_STAGING_ACCESS_KEY|'"${AWS_STAGING_ACCESS_KEY}"'|g' ~/.aws/credentials
sed -i -e 's|AWS_STAGING_SECRET_KEY|'"${AWS_STAGING_SECRET_KEY}"'|g' ~/.aws/credentials

# update apps deployment
kubectl -n alta13 --kubeconfig kubeconfig set image deployment/nginx-deployment app=daffa99/containerd:FE-${TRAVIS_BUILD_NUMBER}