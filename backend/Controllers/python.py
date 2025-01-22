num = 123455
ans = 0
d = {}

for i in str(num):
    if i not in d:
        d[i] = 1
    else:
        d[i]+=1
for i in d:
    if d[i]>1:
        ans+=1
print(ans)